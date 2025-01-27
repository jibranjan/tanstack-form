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
                {!cvSubmitted && (
                    <CandCvUpload 
                        form={form} 
                        setCvSubmitted={setCvSubmitted} 
                    />
                )}
                {cvSubmitted && (
                    <div>
                        <h1>CV Submitted</h1>
                    </div>
                )}
            </form>
        </>
    )
}

export default CandJobApp;