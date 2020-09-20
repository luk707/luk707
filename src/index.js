import React from "react";
import { render } from "react-dom";

import { ProjectsGrid } from "./projects-grid";

render(
  <ProjectsGrid
    username="luk707"
    repos={[
      "flatbond",
      "games",
      "rehype-truncate",
      "envup",
      "ScientificCalculator",
      "letters",
      "form-validators",
      "imprest",
    ]}
  />,
  document.getElementById("projects")
);
