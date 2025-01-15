import { useForm } from "@tanstack/react-form"
import { useState } from "react"
import FieldAccordion from "./FieldAccordion.tsx"
import ImportantFields from "./job-description-tab/ImportantFields.tsx"
import OtherFields from "./job-description-tab/OtherFields.tsx"
import JobApplication from "./job-application-tab/JobApplication.tsx"
import JobCreationTabs from "./JobCreationTabs.tsx"

function CreateJobPostForm() {
    const [activeTab, setActiveTab] = useState(0)

    const form = useForm({
        defaultValues: {
            roleType: 'On-site',
            showCompanyAbout: false,
            visaSponsorship: 'Not applicable',
            hasTravelRequirements: 'Yes',
            howCandidatesApply: 'job-posting-url',
        },
        onSubmit: async ({ value }) => {
            // TODO: Submit the form
        },
    })

    return (
        <>
            <JobCreationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <form
                className="max-md:max-w-2xl md:max-xl:max-w-3xl xl:max-w-lg mt-5 mb-20 max-xl:mx-auto max-md:px-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                {/* Important Fields */}
                <div className="flex flex-col gap-10">
                    {activeTab === 0 && (
                        <>
                            <FieldAccordion fieldName="Important Fields">
                                <ImportantFields form={form}  />
                            </FieldAccordion>

                            <FieldAccordion fieldName="Other Fields">
                                <OtherFields form={form} />
                            </FieldAccordion>
                        </>
                    )}

                    {activeTab === 1 && (
                        <JobApplication form={form} />
                    )}

                </div>

            </form>
        </>
    )
}

export default CreateJobPostForm