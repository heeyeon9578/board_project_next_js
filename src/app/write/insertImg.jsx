"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InsertImg() {
    const [src, setSrc] = useState(""); // 이미지 미리보기 URL
    const [file, setFile] = useState(null); // 업로드할 파일 객체
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter(); // useRouter 훅 사용

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setSrc(URL.createObjectURL(selectedFile)); // 미리보기 URL 설정
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let uploadedUrl = null; // 이미지 URL 초기화

        try {
            // 이미지 파일이 선택된 경우에만 업로드 진행
            if (file) {
                const filename = encodeURIComponent(file.name);
                const res = await fetch(`/api/post/image?file=${filename}`);

                if (!res.ok) {
                    throw new Error("이미지 업로드 URL을 가져오는 데 실패했습니다.");
                }

                const data = await res.json();

                // S3에 이미지 업로드
                const formData = new FormData();
                Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                const uploadResult = await fetch(data.url, {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResult.ok) {
                    throw new Error("이미지 업로드 실패");
                }
                
                // 업로드 성공한 경우에만 URL 저장
                uploadedUrl = `${data.url}/${filename}`;
            }

            // 제목, 내용, 이미지 URL(또는 null)을 포함하여 /api/post/new에 POST 요청
            const postData = {
                title,
                content,
                imageUrl: uploadedUrl, // 이미지가 없으면 null이 전송됨
            };

            const postRes = await fetch("/api/post/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!postRes.ok) {
                throw new Error("게시물 생성 실패");
            }

            alert("게시물이 성공적으로 생성되었습니다!");

           // 게시물 생성 성공 후 /list 페이지로 이동
           router.push("/list"); // next/navigation의 useRouter 사용으로 페이지 이동
        } catch (error) {
            console.error("게시물 생성 중 오류 발생:", error.toString());
            alert(`게시물 생성 중 오류가 발생했습니다: ${error.toString()}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="글 제목 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    name="content"
                    placeholder="글 내용 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} // 파일 선택 시 상태 업데이트
                />
                
                {src && <img src={src} alt="Uploaded preview" />}
                
                <button type="submit">버튼</button>
            </form>
        </>
    );
}
