import { Object3DNode } from "@react-three/fiber";
import CameraControls from "camera-controls";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      threeCameraControls: Object3DNode<CameraControls, typeof CameraControls>;
    }
  }
}
