import { observer } from "mobx-react";
import { TYAxisValues } from "@plane/types";
import { CustomSelect } from "@plane/ui";
// constants
import { ANALYTICS_Y_AXIS_VALUES } from "@/constants/analytics";
import { EEstimateSystem } from "@/constants/estimates";
// hooks
import { useAppRouter, useProjectEstimates } from "@/hooks/store";

type Props = {
  value: TYAxisValues;
  onChange: () => void;
};

export const SelectYAxis: React.FC<Props> = observer(({ value, onChange }) => {
  // hooks
  const { projectId } = useAppRouter();
  const { areEstimateEnabledByProjectId, currentActiveEstimateId, estimateById } = useProjectEstimates();

  const isEstimateEnabled = (analyticsOption: string) => {
    if (analyticsOption === "estimate") {
      if (
        projectId &&
        currentActiveEstimateId &&
        areEstimateEnabledByProjectId(projectId) &&
        estimateById(currentActiveEstimateId)?.type === EEstimateSystem.POINTS
      ) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  };

  return (
    <CustomSelect
      value={value}
      label={<span>{ANALYTICS_Y_AXIS_VALUES.find((v) => v.value === value)?.label ?? "None"}</span>}
      onChange={onChange}
      maxHeight="lg"
    >
      {ANALYTICS_Y_AXIS_VALUES.map(
        (item) =>
          isEstimateEnabled(item.value) && (
            <CustomSelect.Option key={item.value} value={item.value}>
              {item.label}
            </CustomSelect.Option>
          )
      )}
    </CustomSelect>
  );
});
