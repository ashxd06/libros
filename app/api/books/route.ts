import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { books } from "../../../db/schema";
import { getChatGPTUser } from "../../chatgpt-auth";
type Input={id?:number;title?:string;author?:string;coverUrl?:string;isbn?:string;currentPage?:number;currentLine?:number};
const tidy=(x:Input)=>({title:x.title?.trim()??"",author:x.author?.trim()??"",coverUrl:x.coverUrl?.trim()??"",isbn:x.isbn?.trim()??"",currentPage:Math.max(1,Number(x.currentPage)||1),currentLine:Math.max(1,Number(x.currentLine)||1)});
async function user(){return getChatGPTUser()}
export async function GET(){const u=await user();if(!u)return Response.json({error:"Inicia sesión."},{status:401});try{return Response.json({books:await getDb().select().from(books).where(eq(books.userId,u.userId)).orderBy(desc(books.updatedAt))})}catch{return Response.json({error:"No se pudo abrir tu biblioteca."},{status:500})}}
export async function POST(r:Request){const u=await user();const x=tidy(await r.json() as Input);if(!u)return Response.json({error:"Inicia sesión."},{status:401});if(!x.title)return Response.json({error:"El título es obligatorio."},{status:400});const now=new Date();try{const [book]=await getDb().insert(books).values({...x,userId:u.userId,createdAt:now,updatedAt:now}).returning();return Response.json({book},{status:201})}catch{return Response.json({error:"No se pudo guardar."},{status:500})}}
export async function PATCH(r:Request){const u=await user();const raw=await r.json() as Input;const x=tidy(raw);if(!u)return Response.json({error:"Inicia sesión."},{status:401});if(!raw.id||!x.title)return Response.json({error:"Datos incompletos."},{status:400});try{const [book]=await getDb().update(books).set({...x,updatedAt:new Date()}).where(and(eq(books.id,raw.id),eq(books.userId,u.userId))).returning();return book?Response.json({book}):Response.json({error:"Libro no encontrado."},{status:404})}catch{return Response.json({error:"No se pudo actualizar."},{status:500})}}
