import { getGoalsInfo } from "@/apis";

import { GridView } from "./components";
import { use } from "react";

const goalsPromise = getGoalsInfo();

export default function Home() {
  const goals = use(goalsPromise);

  return <GridView goals={goals} />;
}
