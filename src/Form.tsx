import { useForm } from "@tanstack/react-form"
import ImportantFields from "./ImportantFields.tsx"

function Form() {
    const form = useForm({
        defaultValues: {
            jdUpload: '',
            jobTitle: '',
            roleType: 'On-site',
            locations: [{ country: '', cities: [] }],
            jobType: '',
            experience: { min: 0, max: 0 },
            skills: [],
            jobDescription: '',
            salary: { currency: 'usd', min: 0, max: 0 },
            responsibilities: [''],
            startDate: '',
            applicationDeadline: '',
            showCompanyAbout: false
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
            <div>
                <ImportantFields form={form} />
            </div>

        </form>
    )
}

export default Form