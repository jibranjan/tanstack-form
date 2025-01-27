import { useForm } from "@tanstack/react-form"
import { useState } from "react"
import CandCvUpload from "./CandCvUpload.tsx"
import CandJobAppForm from "./CandJobAppForm.tsx"

function CandJobApp() {

    const [cvSubmitted, setCvSubmitted] = useState(false);

    const form = useForm({
        defaultValues: {
        },
        onSubmit: async ({ value }) => {
            // TODO: Submit the form
        },
    })

    return (
        <>
            <form
                className="max-w-3xl mx-auto px-5 2xl:px-0 my-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                {!cvSubmitted && (
                    <CandCvUpload 
                        form={form} 
                        setCvSubmitted={setCvSubmitted} 
                    />
                )}
                {cvSubmitted && (
                    <CandJobAppForm />
                )}
            </form>
        </>
    )
}

export default CandJobApp;