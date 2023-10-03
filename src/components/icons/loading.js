function LoadingIcon() {
    return (
        <svg className="m-auto bg-none block mb-5" width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="21" stroke-width="7" stroke="#93dbe9" stroke-dasharray="32.98672286269283 32.98672286269283" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.3157894736842106s" keyTimes="0;1" values="0 50 50;360 50 50"/>
            </circle>
        </svg>
    )
}

export default LoadingIcon;