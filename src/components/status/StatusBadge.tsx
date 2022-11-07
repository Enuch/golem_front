export const StatusBadge = (props: any) => {
    const setStatus = (status: number): string => {
        if (status === 1) return "Em análise";
        else if (status === 2) return "Enviado";
        else if (status === 3) return "Cancelado";
        return '';
    }

    const setBadgeStatus = (status: number): string => {
        if (status === 1) return "badge bg-label-secondary";
        else if (status === 2) return "badge bg-label-success";
        else if (status === 3) return "badge bg-label-danger";
        return '';
    }

    return (
        <span className={setBadgeStatus(props.status)}>
            {setStatus(props.status)}
        </span>
    )
}