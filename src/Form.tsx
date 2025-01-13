import { useForm } from "@tanstack/react-form"
import ImportantFields from "./job-description-tab/ImportantFields.tsx"
import OtherFields from "./job-description-tab/OtherFields.tsx"

function Form() {
    const form = useForm({
        defaultValues: {
            roleType: 'On-site',
            showCompanyAbout: false,
            visaSponsorship: 'Not applicable',
            hasTravelRequirements: 'Yes',
        },
        onSubmit: async ({ value }) => {
          console.log(value)
        },
      })
    return (
        <form
            className="max-w-lg mb-20"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            {/* Important Fields */}
            <div className="flex flex-col gap-10">
                <ImportantFields form={form} />
                <OtherFields form={form} />
            </div>

        </form>
    )
}

export default Form