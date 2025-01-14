import React from 'react'

interface StagesProps {
    form: any;
}

const Stages = ({form}: StagesProps) => {
  return (
    <section className="flex flex-col gap-5 bg-white rounded-lg px-5 py-3 shadow-md">
        <h2 className="text-gray-700 text-lg mb-3">Configure different stages</h2>

        <div className='flex items-center justify-between gap-2'>
            <form.Field
                name="stage"
                children={(field: any) => (
                    <select
                        name="stage"
                        id="stage"
                        className="text-sm text-gray-900 ring-0 border border-gray-300 w-full max-w-72 py-2 px-3 rounded-lg"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                    >
                        <option value="tech-template">Default tech template</option>
                        <option value="non-tech-template">Default non-tech template</option>
                        <option value="custom-template">My custom hiring template</option>
                    </select>
                )}
            />

            <div 
                className="text-sm text-white font-light cursor-pointer flex items-center gap-1 bg-blue-900 px-5 py-2 rounded-md active:scale-95 transition-all duration-150 ease-in-out"
                onClick={() => {
                    // Will have to make a post req.
                }}
            >Save as new</div>
        </div>
    </section>
  )
}

export default Stages