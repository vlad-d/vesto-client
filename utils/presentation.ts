export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const formatAddress = (address: string): string => {
    return address.substring(0, 4) + "..." + address.substring(address.length - 4);
}
