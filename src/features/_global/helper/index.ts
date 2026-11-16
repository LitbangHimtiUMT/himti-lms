export const convertQueryParamsToObject = <T= Record<string, string>>(
    queryParams: string
): T => {
    const query = new URLSearchParams(queryParams);
    const object: Record<string, string> = {};
    for (const [key, value] of query) {
        object[key] = value;
    }
    return object as T;
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