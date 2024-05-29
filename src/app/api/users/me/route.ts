import { getDataFromToken } from "@/helpers/GetDataFromToken";
import {NextResponse , NextRequest} from 'next/server';
import User from '@/models/useModels';
import {connect} from '@/dbConfig/dbConfig'

connect();

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id:userId})
        .select("-password") //i don't want password in user info
        
        return NextResponse.json({
            message:"User found",
            data: user,
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message} , {status: 400})
    }
}
