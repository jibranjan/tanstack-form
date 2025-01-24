import { useForm } from "@tanstack/react-form";
import { useState } from "react";
function Stages({ form }: { form: any }) {
    const [stages, setStages] = useState<FieldType[]>([
        { id: 'applied', name: 'Applied', isMandatory: true, allowChange: false },
        { id: 'shortlisted', name: 'Shortlisted', isMandatory: false, allowChange: true, defaultChecked: true },
        { id: 'assessed', name: 'Assessed', isMandatory: false, allowChange: true, defaultChecked: false },
        { id: 'hired', name: 'Hired', isMandatory: true, allowChange: false },
        { id: 'rejected', name: 'Rejected', isMandatory: true, allowChange: false },
    ]);

    const handleStageChange = (stageId: string, field: any) => {
        const updatedStages = stages.map(stage => {
            if (stage.id === stageId) {
                return { ...stage, defaultChecked: !stage.defaultChecked };
            }
            return stage;
        });

        // Count how many optional stages are checked
        const checkedOptionalStages = updatedStages.filter(
            stage => !stage.isMandatory && stage.defaultChecked
        ).length;

        // If trying to uncheck when only one is checked, prevent the change
        if (checkedOptionalStages === 0) {
            return;
        }

        setStages(updatedStages);
        field.handleChange(stageId);
    };

    return (
        <>
            <form.Field
                name="stages"
                children={(field: any) => (
                    <>
                        <div className="flex flex-col gap-3 bg-white rounded-lg shadow-md p-5">
                            <div>
                                <h2 className="text-gray-700 text-lg">Stages</h2>
                                <p className="text-gray-500 text-sm mb-3">The Applied, Hired and Rejected stages are mandatory. You may choose either one or both of the other two stages.</p>
                            </div>
                            {stages.map((stage: any) => (
                                <label 
                                    htmlFor={stage.id}
                                    key={stage.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input 
                                        type="checkbox" 
                                        id={stage.id}
                                        name="stages"
                                        value={stage.id}
                                        disabled={stage.isMandatory}
                                        checked={stage.isMandatory || stage.defaultChecked}
                                        onBlur={field.handleBlur}
                                        onChange={() => {
                                            field.handleChange(stage.id)
                                            handleStageChange(stage.id, field)
                                        }}
                                        className="w-4 h-4 accent-blue-900 cursor-pointer"
                                    />
                                    <span className="text-gray-700">{stage.name}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}
            />
        </>
    )
}

export default Stages;