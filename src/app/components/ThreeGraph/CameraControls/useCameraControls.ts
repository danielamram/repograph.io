import CameraControls from 'camera-controls';
import { createContext, useContext } from 'react';

export interface CameraControlsContextProps {
  controls: CameraControls | null;
  moveTo: (x: number, y: number, z?: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  panLeft: () => void;
  panRight: () => void;
  panUp: () => void;
  panDown: () => void;
}

export const CameraControlsContext = createContext<CameraControlsContextProps>({
  controls: null,
  moveTo: () => undefined,
  zoomIn: () => undefined,
  zoomOut: () => undefined,
  panLeft: () => undefined,
  panRight: () => undefined,
  panUp: () => undefined,
  panDown: () => undefined
});

export const useCameraControls = () => {
  const context = useContext(CameraControlsContext);

  if (context === undefined) {
    throw new Error(
      '`useCameraControls` hook must be used within a `ControlsProvider` component'
    );
  }

  return context;
};
