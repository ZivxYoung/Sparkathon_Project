// Calculate the daysLeft for the campaigns
export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
};

// calculate how much money, depending on how much the campaign got donated
export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};

// check if the url of the image is loadable
// if got error then callback = false
export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;

    if (img.complete) callback(true);   // fully loaded

    img.onload = () => callback(true);
    img.onerror = () => callback(false)
}