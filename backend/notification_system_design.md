Stage 1:
    


Overview — Core actions
 Create notifications (server-side events)
 Deliver notifications to online users (realtime)
 List and paginate user notifications
 Read / mark-as-read and mark-as-unread
 Delete notifications



Authentication & Headers
Authorization: Bearer for protected endpoints.
Content-Type: application/json


Notification JSON
json
{
  "id": "uuid",
  "user_id": "uuid",
  "type": "string", 
  "title": "string",
  "body": "string",
  "read": false,
  "created_at": "ISO8601 timestamp",
  "expires_at": "ISO8601 timestamp or null"
}



API Endpoints

1 List notifications (paginated)

 api endPoint: GET /api/users/{user_id}/notifications
 Query params: ?page=1&limit=20&unread_only=true|false
 Response: 200

json
{
  "page": 1,
  "limit": 20,
  "total": 123456945534,
  "items": ["","",  ]
}



2 Get single notification

 Endpoint: GET /api/users/{user_id}/notifications/{id}
 headers: Authorization
 response: 200 or 404

SQL:

SELECT * FROM notifications WHERE id = $1 AND user_id = $2;

3 Create notification 
 Endpoint: POST /api/notifications
 Body:

json
{
  "user_id": "id",
  "type": "string",
  "title": "string",
  "body": "string",
  "data": { },
  "expires_at": ""
}

