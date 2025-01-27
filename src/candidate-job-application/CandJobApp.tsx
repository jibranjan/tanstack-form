import { useForm } from "@tanstack/react-form"
import CandCvUpload from "./CandCvUpload"
import { useState } from "react"
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
                <CandCvUpload 
                    form={form} 
                    setCvSubmitted={setCvSubmitted} 
                />
            </form>
        </>
    )
}

export default CandJobApp;