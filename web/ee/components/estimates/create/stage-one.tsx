import { FC } from "react";
// components
import { RadioInput } from "@/components/radio-group";
// constants
import { ESTIMATE_SYSTEMS } from "@/constants/estimates";
// types
import { TEstimateSystemKeys } from "@/ee/components/estimates/types";

type TEstimateCreateStageOne = {
  estimateSystem: TEstimateSystemKeys;
  handleEstimateSystem: (value: TEstimateSystemKeys) => void;
  handleEstimatePoints: (value: TEstimateSystemKeys) => void;
};

export const EstimateCreateStageOne: FC<TEstimateCreateStageOne> = (props) => {
  const { estimateSystem, handleEstimateSystem, handleEstimatePoints } = props;

  const currentEstimateSystem = ESTIMATE_SYSTEMS[estimateSystem] || undefined;

  if (!currentEstimateSystem) return <></>;
  return (
    <div className="space-y-2">
      <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0 gap-2 mb-2">
        <RadioInput
          options={Object.keys(ESTIMATE_SYSTEMS).map((system) => {
            const currentSystem = system as TEstimateSystemKeys;
            return {
              label: ESTIMATE_SYSTEMS[currentSystem]?.name,
              value: system,
              disabled: !ESTIMATE_SYSTEMS[currentSystem]?.is_available,
            };
          })}
          label="Choose an estimate system"
          labelClassName="text-sm font-medium text-custom-text-200 mb-3"
          selected={estimateSystem}
          onChange={(value) => handleEstimateSystem(value as TEstimateSystemKeys)}
          className="mb-4"
        />
      </div>
      <div className="space-y-3">
        <div className="text-sm font-medium text-custom-text-200 mb-3">Choose a template</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {Object.keys(currentEstimateSystem.templates).map((name) => (
            <button
              key={name}
              className="border border-custom-border-200 rounded-md p-2 text-left"
              onClick={() => handleEstimatePoints(name as TEstimateSystemKeys)}
            >
              <p className="block text-sm">{currentEstimateSystem.templates[name]?.title}</p>
              <p className="text-xs text-gray-400">
                {currentEstimateSystem.templates[name]?.values?.map((template) => template?.value)?.join(", ")}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
