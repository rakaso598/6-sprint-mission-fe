import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: "이름과 가격은 필수입니다." },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: { name, description, price },
    });

    return NextResponse.json(
      { message: "상품 등록 성공", productId: newProduct.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("상품 등록 오류:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
