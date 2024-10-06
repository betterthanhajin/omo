import { useState, useCallback } from "react";

export interface Layer {
  id: number;
  Component: React.ComponentType;
  opacity: number;
  visible: boolean;
  zIndex: number;
  blendMode: string;
}

export type LayerChanges = Partial<Omit<Layer, "id" | "Component">>;

export interface UseLayerSystemResult {
  layers: Layer[];
  activeLayerId: number | null;
  addLayer: (component: React.ComponentType) => void;
  removeLayer: (id: number) => void;
  updateLayer: (id: number, changes: LayerChanges) => void;
  setActiveLayer: (id: number | null) => void;
  moveLayer: (id: number, newIndex: number) => void;
}

export const useLayerSystem = (
  initialComponents: React.ComponentType[]
): UseLayerSystemResult => {
  const [layers, setLayers] = useState<Layer[]>(() =>
    initialComponents.map((Component, index) => ({
      id: index,
      Component,
      opacity: 1,
      visible: index === 0,
      zIndex: index,
      blendMode: "normal",
    }))
  );
  const [activeLayerId, setActiveLayerId] = useState<number | null>(0);

  const addLayer = useCallback((component: React.ComponentType) => {
    setLayers((prevLayers) => [
      ...prevLayers,
      {
        id: prevLayers.length,
        Component: component,
        opacity: 1,
        visible: true,
        zIndex: prevLayers.length,
        blendMode: "normal",
      },
    ]);
  }, []);

  const removeLayer = useCallback(
    (id: number) => {
      setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
      if (activeLayerId === id) {
        setActiveLayerId(null);
      }
    },
    [activeLayerId]
  );

  const updateLayer = useCallback((id: number, changes: LayerChanges) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, ...changes } : layer
      )
    );
  }, []);

  const setActiveLayer = useCallback((id: number | null) => {
    setActiveLayerId(id);
  }, []);

  const moveLayer = useCallback((id: number, newIndex: number) => {
    setLayers((prevLayers) => {
      const layerIndex = prevLayers.findIndex((layer) => layer.id === id);
      if (layerIndex === -1) return prevLayers;

      const newLayers = [...prevLayers];
      const [movedLayer] = newLayers.splice(layerIndex, 1);
      newLayers.splice(newIndex, 0, movedLayer);

      return newLayers.map((layer, index) => ({
        ...layer,
        zIndex: index,
      }));
    });
  }, []);

  return {
    layers,
    activeLayerId,
    addLayer,
    removeLayer,
    updateLayer,
    setActiveLayer,
    moveLayer,
  };
};
