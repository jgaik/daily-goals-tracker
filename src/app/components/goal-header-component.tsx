import { CustomHeaderProps } from "ag-grid-react";
import { useLayoutEffect } from "react";

import { GoalInfo } from "@/types";

import { GoalInfoPreview } from "./goal-info-preview";
import { useDialog } from "@yamori-design/react-components";

export const GoalHeaderComponent: React.FC<
  CustomHeaderProps & { goal: GoalInfo }
> = ({ displayName, eGridHeader, goal }) => {
  const { showDialog } = useDialog();

  useLayoutEffect(() => {
    const handleClick = () => {
      showDialog(<GoalInfoPreview {...goal} />, { closeOnOutsideClick: true });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["Enter", " "].includes(event.key)) {
        handleClick();
      }
    };

    eGridHeader.addEventListener("click", handleClick);
    eGridHeader.addEventListener("keydown", handleKeyDown);

    return () => {
      eGridHeader.removeEventListener("click", handleClick);
      eGridHeader.removeEventListener("keydown", handleKeyDown);
    };
  }, [displayName, eGridHeader, goal, showDialog]);

  return [
    displayName,
    <span key="info" role="presentation">
      (?)
    </span>,
  ];
};
