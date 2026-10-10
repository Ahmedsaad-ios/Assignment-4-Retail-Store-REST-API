import * as reportService from "./report.service.js";

const handleReport = (serviceFunction) => {
    return async (req, res) => {
        try {
            const result = await serviceFunction();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    };
};

export const getTotalSold = handleReport(
    reportService.getTotalSold
);

export const getHighestStock = handleReport(
    reportService.getHighestStock
);

export const getSuppliersStartingWithF = handleReport(
    reportService.getSuppliersStartingWithF
);

export const getNeverSoldProducts = handleReport(
    reportService.getNeverSoldProducts
);

export const getSalesDetails = handleReport(
    reportService.getSalesDetails
);