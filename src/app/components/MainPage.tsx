"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GITHUB_TOKEN } from "../graphql";
import { useEntities, useLoginGuard, useSelected } from "../hooks";
import { BasicLogin, BasicRepository, IGraph, NodeData } from "../types";
import { buildGraph } from "../utils/graph";

const Graph = dynamic(() => import("./Graph"), { ssr: false });

const MainPage = () => {
  const { toggleShow } = useLoginGuard();
  const [graph, setGraph] = useState<IGraph>({
    nodes: [],
    edges: [],
  });
  const { selectNode } = useSelected();
  const { fetchRepoUsers, repositories, users, reposToUsers, fetchUserRepos } =
    useEntities();

  useEffect(() => {
    const newGraph = buildGraph(repositories, users, reposToUsers);
    setGraph(newGraph);
  }, [repositories, users, reposToUsers]);

  const onNodeClick = async (data?: NodeData) => {
    if (!GITHUB_TOKEN) {
      toggleShow();
      return;
    }

    if (!data) {
      selectNode();
      return;
    }

    if (data.type === "user") {
      await fetchUserRepos((data.obj as BasicLogin).login);
      selectNode({
        id: (data.obj as BasicLogin).login,
        type: "user",
      });
    } else {
      await fetchRepoUsers((data.obj as BasicRepository).nameWithOwner);
      selectNode({
        id: (data.obj as BasicRepository).nameWithOwner,
        type: "repo",
      });
    }
  };

  return (
    <div className="relative h-full w-full">
      <Graph onNodeClick={onNodeClick} graph={graph} />
    </div>
  );
};

export default MainPage;
