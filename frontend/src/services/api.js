import axios from 'axios';

const API_URL = "http://localhost/aqarSiteBackend/backend/api/";

// جلب جميع العقارات
export const fetchProperties = async () => {
    try {
        const response = await axios.get(`${API_URL}/getProperty.php`);
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

// جلب عقار حسب ID
export const fetchPropertyById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getPropertyById.php`, {
            params: { id }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching property by ID:', error);
        throw error;
    }
};

export async function fetchPropertiesQuery(filters) {
    let url = `${API_URL}/getPropertyQuary.php`;

    // إذا كانت الفلاتر موجودة
    if (filters && (filters.offer || filters.city || filters.type)) {
        const { offer, city, type } = filters;

        const queryParams = new URLSearchParams({
            ...(offer && { offer }),
            ...(city && { city }),
            ...(type && { type }),
        });

        url += `?${queryParams.toString()}`; // إضافة الفلاتر إلى الرابط
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error; // إعادة رمي الخطأ
    }
}


export const updatePropertyStatus = async (id, status) => {
    try {
        const response = await axios.post(`${API_URL}/updatePropertyStatus.php`, {
            id,
            status,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating property status:', error);
        throw error;
    }
};


// حذف إعلان العقار
export const deleteProperty = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/deleteProperty.php`, { id });
        console.log(id)
        return response.data;
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
};
