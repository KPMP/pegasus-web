import actionNames from '../actionNames'

export const setEnrollmentCategory = (enrollmentCategory) => {
    return {
        type: actionNames.SET_ENROLLMENT_CATEGORY,
        payload: enrollmentCategory
    }
};
