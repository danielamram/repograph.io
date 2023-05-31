import { extend, useFrame, useThree } from "@react-three/fiber";
import ThreeCameraControls from "camera-controls";
import * as holdEvent from "hold-event";
import {
  FC,
  ReactNode,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useHotkeys } from "reakeys";
import {
  Box3,
  MOUSE,
  MathUtils,
  Matrix4,
  Quaternion,
  Raycaster,
  Sphere,
  Spherical,
  Vector2,
  Vector3,
  Vector4,
} from "three";
import { useStore } from "../store";
import {
  CameraControlsContext,
  CameraControlsContextProps,
} from "./useCameraControls";

// Install the camera controls
// Use a subset for better three shaking
ThreeCameraControls.install({
  THREE: {
    MOUSE: MOUSE,
    Vector2: Vector2,
    Vector3: Vector3,
    Vector4: Vector4,
    Quaternion: Quaternion,
    Matrix4: Matrix4,
    Spherical: Spherical,
    Box3: Box3,
    Sphere: Sphere,
    Raycaster: Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils?.DEG2RAD,
      clamp: MathUtils?.clamp,
    },
  },
});

// Extend r3f with the new controls
extend({ ThreeCameraControls });

const KEY_CODES = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
};

const leftKey = new holdEvent.KeyboardKeyHold(KEY_CODES.ARROW_LEFT, 100);
const rightKey = new holdEvent.KeyboardKeyHold(KEY_CODES.ARROW_RIGHT, 100);
const upKey = new holdEvent.KeyboardKeyHold(KEY_CODES.ARROW_UP, 100);
const downKey = new holdEvent.KeyboardKeyHold(KEY_CODES.ARROW_DOWN, 100);

export type CameraMode = "pan" | "rotate" | "orbit";

export interface CameraControlsProps {
  /**
   * Mode of the camera.
   */
  mode?: CameraMode;

  /**
   * Children symbols.
   */
  children?: ReactNode;

  /**
   * Animate transitions to centering.
   */
  animated?: boolean;

  /**
   * Disable the controls.
   */
  disabled?: boolean;
}

export type CameraControlsRef = CameraControlsContextProps;

export const CameraControls: FC<
  CameraControlsProps & { ref?: Ref<CameraControlsRef> }
> = forwardRef(
  ({ mode, children, animated, disabled }, ref: Ref<CameraControlsRef>) => {
    const cameraRef = useRef<ThreeCameraControls | null>(null);
    const camera = useThree((state) => state.camera);
    const gl = useThree((state) => state.gl);
    const isOrbiting = mode === "orbit";
    const setPanning = useStore((state) => state.setPanning);

    useFrame((_state, delta) => {
      if (cameraRef.current?.enabled) {
        cameraRef.current?.update(delta);
      }

      if (isOrbiting) {
        cameraRef.current.azimuthAngle += 20 * delta * MathUtils.DEG2RAD;
      }
    }, -1);

    useEffect(() => () => cameraRef.current?.dispose(), []);

    const zoomIn = useCallback(() => {
      cameraRef.current?.zoom(camera.zoom / 2, animated);
    }, [animated, camera.zoom]);

    const zoomOut = useCallback(() => {
      cameraRef.current?.zoom(-camera.zoom / 2, animated);
    }, [animated, camera.zoom]);

    const moveTo = useCallback(
      (x: number, y: number, z?: number) => {
        cameraRef.current?.setPosition(x, y, z || camera.position.z, animated);
      },
      [animated, camera.position.z]
    );

    const panRight = useCallback(
      (event) => {
        if (!isOrbiting) {
          cameraRef.current?.truck(-0.03 * event.deltaTime, 0, animated);
        }
      },
      [animated, isOrbiting]
    );

    const panLeft = useCallback(
      (event) => {
        if (!isOrbiting) {
          cameraRef.current?.truck(0.03 * event.deltaTime, 0, animated);
        }
      },
      [animated, isOrbiting]
    );

    const panUp = useCallback(
      (event) => {
        if (!isOrbiting) {
          cameraRef.current?.truck(0, 0.03 * event.deltaTime, animated);
        }
      },
      [animated, isOrbiting]
    );

    const panDown = useCallback(
      (event) => {
        if (!isOrbiting) {
          cameraRef.current?.truck(0, -0.03 * event.deltaTime, animated);
        }
      },
      [animated, isOrbiting]
    );

    const onKeyDown = useCallback(
      (event) => {
        if (event.code === "Space") {
          if (mode === "rotate") {
            cameraRef.current.mouseButtons.left =
              ThreeCameraControls.ACTION.TRUCK;
          } else {
            cameraRef.current.mouseButtons.left =
              ThreeCameraControls.ACTION.ROTATE;
          }
        }
      },
      [mode]
    );

    const onKeyUp = useCallback(
      (event) => {
        if (event.code === "Space") {
          if (mode === "rotate") {
            cameraRef.current.mouseButtons.left =
              ThreeCameraControls.ACTION.ROTATE;
          } else {
            cameraRef.current.mouseButtons.left =
              ThreeCameraControls.ACTION.TRUCK;
          }
        }
      },
      [mode]
    );

    useEffect(() => {
      leftKey.addEventListener("holding", panLeft);
      rightKey.addEventListener("holding", panRight);
      upKey.addEventListener("holding", panUp);
      downKey.addEventListener("holding", panDown);
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);

      return () => {
        leftKey.removeEventListener("holding", panLeft);
        rightKey.removeEventListener("holding", panRight);
        upKey.removeEventListener("holding", panUp);
        downKey.removeEventListener("holding", panDown);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      };
    }, [onKeyDown, onKeyUp, panDown, panLeft, panRight, panUp]);

    useEffect(() => {
      const onControl = () => setPanning(true);
      const onControlEnd = () => setPanning(false);

      const ref = cameraRef.current;
      if (ref) {
        ref.addEventListener("control", onControl);
        ref.addEventListener("controlend", onControlEnd);
      }

      return () => {
        if (ref) {
          ref.removeEventListener("control", onControl);
          ref.removeEventListener("controlend", onControlEnd);
        }
      };
    }, [cameraRef, setPanning]);

    useEffect(() => {
      if (mode === "rotate") {
        cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.ROTATE;
      } else {
        cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.TRUCK;
      }
    }, [mode]);

    useHotkeys([
      {
        name: "Zoom In",
        keys: "command+shift+i",
        callback: (event) => {
          event.preventDefault();
          zoomIn();
        },
      },
      {
        name: "Zoom Out",
        keys: "command+shift+o",
        callback: (event) => {
          event.preventDefault();
          zoomOut();
        },
      },
    ]);

    const values = useMemo(
      () => ({
        controls: cameraRef.current,
        moveTo: (x: number, y: number, z?: number) => moveTo(x, y, z),
        zoomIn: () => zoomIn(),
        zoomOut: () => zoomOut(),
        panLeft: () => panLeft({ deltaTime: 1 }),
        panRight: () => panRight({ deltaTime: 1 }),
        panDown: () => panDown({ deltaTime: 1 }),
        panUp: () => panUp({ deltaTime: 1 }),
      }),
      // eslint-disable-next-line
      [zoomIn, zoomOut, panLeft, panRight, panDown, panUp, cameraRef.current]
    );

    useImperativeHandle(ref, () => values);

    return (
      <CameraControlsContext.Provider value={values}>
        <threeCameraControls
          ref={cameraRef}
          args={[camera, gl.domElement]}
          enabled={!disabled}
          smoothTime={0.1}
          minDistance={1000}
          maxDistance={50000}
        />
        {children}
      </CameraControlsContext.Provider>
    );
  }
);

CameraControls.defaultProps = {
  mode: "rotate",
};
