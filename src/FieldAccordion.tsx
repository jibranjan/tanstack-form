import React, { useState } from 'react'
import FormHeading from './FormHeading';

const FieldAccordion = ({children, fieldName}: {children: React.ReactNode, fieldName: string}) => {
    const [isExpanded, setIsExpanded] = useState(true);
  return (
    <section className="flex flex-col gap-3 bg-white rounded-lg px-5 py-3 shadow-md relative">
        <FormHeading
            fieldName={fieldName}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
        />
        {isExpanded && (
            <>
                {children}
            </>
        )}
    </section>
  )
}

export default FieldAccordion