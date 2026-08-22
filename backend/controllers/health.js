// CONTROLLER FUNCTION THAT RETURNS THE HEALTH STATUS OF THE SERVER
export const checkHealth = (req, res, next) => {
    try {
        return res.status(200).json({
            status: "success"
        })
    }
    catch (err) {
        next(err);
    }
}