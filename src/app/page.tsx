import MainPage from "./components/MainPage";
import { SelectedNodeProvider } from "./context/SelectedNodeContext";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <SelectedNodeProvider>
        <MainPage />
      </SelectedNodeProvider>
    </main>
  );
}
