interface FormHeadingProps {
    fieldName: string;
    isExpanded: boolean;
    onToggle: () => void;
}

function FormHeading({ fieldName, isExpanded, onToggle }: FormHeadingProps) {
    return (
        <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={onToggle}
        >
            <h1 className="text-lg text-blue-900">{fieldName}</h1>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className={`text-gray-600 w-5 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                }`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
        </div>
    )
}

export default FormHeading