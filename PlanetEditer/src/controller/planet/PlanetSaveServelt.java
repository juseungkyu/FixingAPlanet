package controller.planet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Enumeration;
import java.util.Random;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.oreilly.servlet.MultipartRequest;

import controller.DefaultServlet;

@WebServlet("/planet/save")
//tomcat 기본 설정이 PUT, DELETE를 막아놔서 수행 제출하고 작동 안될까봐 따로 준비
public class PlanetSaveServelt extends DefaultServlet {

	// 행성 업데이트
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doPost(req, resp);
		System.out.println("put 확인");
		PrintWriter ps = resp.getWriter();
		ps.println(this.createSuccessMessage("저장을 성공했습니다."));
		return;
		
//		int result = this.saveCanvas(req);
//		
//		if(result == 0) {
//			ps.println(this.createErrorMessage("저장을 실패했습니다."));
//			return;
//		}
//		
//
//		ps.println(this.createSuccessMessage("저장을 성공했습니다."));
//		return;
	}

	// 캔버스 저장
	private int saveCanvas(HttpServletRequest request) {
		ServletContext application = getServletContext(); 
	    String fileFolder = application.getRealPath("/image/canvas");
	    
		String tempPath = "C:\\tempFile";
		int MAX_SIZE = 300 * 1024 * 1024; // 최대 크기
		
		try {
			File file = new File(tempPath);
			if(!file.exists()) { // 파일 경로가 존재하지 않을 경우
				file.mkdirs(); // 파일 경로 만들기
			}
			
			MultipartRequest multipart = new MultipartRequest(request, tempPath, MAX_SIZE, "UTF-8");
			
			Enumeration<String> fileEnum = multipart.getFileNames();
			String fileId = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
			
			if(!this.saveFile(fileFolder, "bumpmap", multipart.getFile("bumpmap"), fileId)) {
				return 0;
			}
			if(!this.saveFile(fileFolder, "cloudmap", multipart.getFile("cloudmap"), fileId)) {
				return 0;
			}
			if(!this.saveFile(fileFolder, "colormap", multipart.getFile("colormap"), fileId)) {
				return 0;
			}
			if(!this.saveFile(fileFolder, "continent", multipart.getFile("continent"), fileId)) {
				return 0;
			}
			if(!this.saveFile(fileFolder, "map", multipart.getFile("map"), fileId)) {
				return 0;
			}
			
		} catch (IOException e) {
			return 0;
		}
		
		return 1;
	}
	
	// 파일 저장
	private boolean saveFile(String saveFolder, String type, File file, String fileName) {
		String[] fileNameSplited = file.getName().split(".");
		String extension = fileNameSplited[fileNameSplited.length-1];
		
		File realFile = new File(saveFolder + "/" + fileName + "." + extension);
		
		return file.renameTo(realFile);
	}
}
