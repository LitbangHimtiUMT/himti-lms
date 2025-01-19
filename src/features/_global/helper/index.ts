export const convertQueryParamsToObject = (
    queryParams: string
): Record<string, string> => {
    const query = new URLSearchParams(queryParams);
    const object: Record<string, string> = {};
    for (const [key, value] of query) {
        object[key] = value;
    }
    return object;
}

export const convertObjectToQueryParams = (object?: Record<string, string | number | null | undefined>): string => {
    if (!object || typeof object !== 'object' || Array.isArray(object)) {
        return '';
    }

    const query = new URLSearchParams();
    Object.keys(object).forEach(key => {
        const value = object[key];
        if (typeof value === 'string' || typeof value === 'number') {
            query.append(key, value.toString());
        }
    });

    return query.toString();
}

export const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(number);
};

export const FormatIDTime = (date: Date) => {
    const dates = new Date(date);
    // const format = dates.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    // return format
    const timezoneOffset = 7 * 60; // 7 hours converted to minutes
    const localDate = new Date(dates.getTime() + timezoneOffset * 60 * 1000);

    // Convert to ISO string without affecting the timezone
    const isoString = localDate.toISOString()
    return isoString
}