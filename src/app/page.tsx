import MainPage from "./components/MainPage";
import { SelectedNodeProvider } from "./context/SelectedNodeContext";

export default function Home() {
  return (
    <main className="h-[calc(100vh-60px)] w-screen">
      <SelectedNodeProvider>
        <MainPage />
      </SelectedNodeProvider>
    </main>
  );
}
