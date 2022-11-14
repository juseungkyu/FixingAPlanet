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
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.oreilly.servlet.MultipartRequest;

import common.Util;
import dao.CanvasDAO;
import dao.PlanetDAO;
import vo.Planet;
import vo.User;

//tomcat 기본 설정이 PUT, DELETE를 막아놔서 수행 제출하고 작동 안될까봐 따로 준비
@WebServlet("/planet/save")
public class PlanetSaveServlet extends HttpServlet {
    private static PlanetDAO planetDao = new PlanetDAO();
    private static CanvasDAO canvasDao = new CanvasDAO();

	// 행성 생성하기
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();
		
		String requestData = request.getParameter("json");
		if(this.saveCanvas(request) == 0) {
			ps.println(Util.createErrorMessage("저장을 실패했습니다."));
			return;
		}

		ps.println(Util.createSuccessMessage("저장을 성공했습니다."));
	}


	// 캔버스 저장
	private int saveCanvas(HttpServletRequest request) {
		ServletContext application = getServletContext(); 
	    String fileFolder = application.getRealPath("/resources/image/canvas");
	    
		String tempPath = "C:\\tempFile";
		int MAX_SIZE = 300 * 1024 * 1024; // 최대 크기
		
		try {
			File file = new File(tempPath);
			if(!file.exists()) { // 파일 경로가 존재하지 않을 경우
				file.mkdirs(); // 파일 경로 만들기	
			}
			
			MultipartRequest multipart = new MultipartRequest(request, tempPath, MAX_SIZE, "UTF-8");

			int planetId = Integer.parseInt(multipart.getParameter("planetId"));
			int seaLevel = Integer.parseInt(multipart.getParameter("seaLevel"));
			System.out.println(planetId);
			
			String fileId = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
			
			if(!Util.saveFile(fileFolder+"/bumpmap", "bumpmap", multipart.getFile("bumpMap"), fileId)) {
				return 0;
			}
			if(!Util.saveFile(fileFolder+"/cloudmap", "cloudmap", multipart.getFile("cloudMap"), fileId)) {
				return 0;
			}
			if(!Util.saveFile(fileFolder+"/colormap", "colormap", multipart.getFile("colorMap"), fileId)) {
				return 0;
			}
			if(!Util.saveFile(fileFolder+"/continent", "continent", multipart.getFile("continentMap"), fileId)) {
				return 0;
			}
			if(!Util.saveFile(fileFolder+"/map", "map", multipart.getFile("map"), fileId)) {
				return 0;
			}
			
			Planet planet = this.planetDao.getPlanet(planetId);
			this.planetDao.changeSeaLevel(planetId, seaLevel);
			this.canvasDao.putCanvas(planet.getCanvas().getCanvasId(), "/"+fileId+".png");
		} catch (IOException e) {
			e.printStackTrace();
			return 0;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		return 1;
	}
}
