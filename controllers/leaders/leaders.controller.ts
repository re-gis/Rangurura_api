import IRequest from "../../interfaces/IRequest";
import IResponse from "../../interfaces/IResponse";
import {getRepository, Repository} from "typeorm";
import Leader from "../../entities/leaders.entity";
import {userRouter} from "../../routes/userRouters/user.routes";
import User from "../../entities/user.entity";

export const createALeader = async (req:IRequest, res:IResponse):Promise<IResponse> => {
    const leaderRepo:Repository<Leader> = getRepository(Leader)
    const userRepo:Repository<User> = getRepository(User)
    try {
        if (!req.user)
            return res.status(403).json({
                message: "Login to continue",
            });
        const { indangamuntu, organizationLevel, location, category, role } =
            req.body;

        if (!indangamuntu || !organizationLevel || !location || !category || !role)
            return res.status(403).json({
                message: "All credentials are required!",
            });

        // find the leader if present update else create new one
        const eUser = await userRepo.findOne({
            where: {
                nationalId: indangamuntu,
            },
        });

        if (eUser) {
            // check if he already exists
            const eUser = await leaderRepo.findOne({where:{nationalId:indangamuntu}})
            if(eUser) {
                return res.status(401).json({message:"Leader already exists!"})
            }
            // update the current user
            const userToSave = new Leader(role, category, location, organizationLevel, indangamuntu);

            if (await leaderRepo.save(userToSave))
                return res.status(201).json({ message: "Leader saved successfully" });
            return res.status(500).json({
                mesage: "Error while saving the leader",
            });
        }else {
            return res.status(401).json({message:"Leader must be a user!"})
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal server error...",
        });
    }
};