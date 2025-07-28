export function formatDate(date){
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}

export function shortenTitle(title){
    if(title.length < 24) return title;
    return title.substring(0,24) + "..."
}