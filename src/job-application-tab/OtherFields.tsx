import { useState } from "react";

interface OtherFieldsProps {
    form: any;
    fields: any;
    section: 'important' | 'other';
    setFields: (fields: any) => void;
}

function OtherFields({ form, fields, section, setFields }: OtherFieldsProps) {
    return (
        <div className="grid grid-cols-2 gap-x-5 gap-y-2 p-2">
            {fields.filter((fld: any) => fld.section === section).map((fld: any) => {
                const selectionFieldName = `${section}-field-${fld.id}-selection`;
                const mandatoryFieldName = `${section}-field-${fld.id}-mandatory`;
                return (
                    <div key={fld.id} className="flex items-center justify-between gap-2 col-span-1">
                        <form.Field
                            name={selectionFieldName}
                            defaultValue={fld.isMandatory}
                            children={(field: any) => {
                                return (
                                    <label 
                                        htmlFor={`${fld.id}-checkbox`} 
                                        className="text-sm text-gray-700 font-light flex items-center gap-2"
                                    >
                                        <input 
                                            id={`${fld.id}-checkbox`}
                                            className="w-3.5 h-3.5 accent-blue-900 mt-0.5 rounded-sm" 
                                            type="checkbox" 
                                            checked={field.state.value || form.getFieldValue(mandatoryFieldName) || false}
                                            disabled={!fld.allowChange || form.getFieldValue(mandatoryFieldName) || false}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                        />
                                        {fld.name}
                                    </label>
                                )
                            }}
                        />
                        <form.Field
                            name={mandatoryFieldName}
                            defaultValue={fld.isMandatory}
                            children={(field: any) => {
                                return (
                                    <label 
                                        htmlFor={`${fld.id}-mandatory`} 
                                        title="Mark as mandatory"
                                        className="relative inline-flex items-center"
                                    >
                                        <input
                                            id={`${fld.id}-mandatory`}
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={field.state.value || false}
                                            disabled={!fld.allowChange || false}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                field.handleChange(e.target.checked);
                                                // If mandatory is checked, ensure selection is also checked
                                                if (e.target.checked) {
                                                    form.setFieldValue(selectionFieldName, true);
                                                    setFields((prevFields: any) => prevFields.map((prevField: any) => prevField.id === fld.id ? { ...fld, isMandatory: true } : prevField));
                                                }
                                            }}
                                        />
                                        <div className="cursor-pointer w-7 h-3.5 bg-gray-400 outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[1px] after:left-[2px] after:text-[10px] after:flex after:items-center after:justify-center after:text-emerald-500 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500 peer-disabled:bg-gray-200"></div>
                                    </label>
                                )
                            }}
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default OtherFields;