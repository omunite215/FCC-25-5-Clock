import { MotionConfig } from "framer-motion";
import { Clock } from "./components/Clock";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <Clock />
      </ErrorBoundary>
    </MotionConfig>
  );
}
