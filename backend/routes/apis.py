from fastapi import APIRouter, HTTPException
from services.db import collection, os, db
router = APIRouter(prefix="/apis", tags=["APIs"])


@router.get("/list-apis")
async def list_apis(address: str):
    try:
        apis = collection.find({"address": address}, {"_id": 0, "api_key": 1, "credits_left": 1})
        api_list = [{"api_key": api["api_key"], "credits_left": api.get("credits_left", 0)} for api in apis]
        return {"apis": api_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create-api")
async def create_api(address: str, money_paid: float, credits: int = 500):  # 50 generations by default
    try:
        api_key = os.urandom(16).hex()  # Generate a random API key
        collection.insert_one({"address": address, "api_key": api_key, "credits_left": credits, "money_paid": money_paid})
        return {"message": "API created successfully", "api_key": api_key, "credits_left": credits}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete-api")
async def delete_api(address: str, api_key: str):
    try:
        result = collection.delete_one({"address": address, "api_key": api_key})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="API key not found")
        return {"message": "API key deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

