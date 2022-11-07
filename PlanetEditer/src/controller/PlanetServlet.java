package controller;

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

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.json.simple.JSONObject;

import com.oreilly.servlet.MultipartRequest;

import dao.PlanetDAO;
import vo.Canvas;
import vo.Planet;
import vo.User;

@WebServlet("/planet")
public class PlanetServlet extends DefaultServlet {
	private static final long serialVersionUID = 1L;
    private static PlanetDAO planetDao = new PlanetDAO(); 
    
    public PlanetServlet() {
        super();
    }
    
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();
		
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		
		System.out.println(title);

		if(title == null || title.length() == 0) {
			ps.println("{\"err\" : {\"message\" : \"title이 비어있습니다.\"}}");
			return;
		}
		if(content == null || content.length() == 0) {
			ps.println("{\"err\" : {\"message\" : \"content이 비어있습니다.\"}}");
			return;
		}
		
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userSession");
		
		if(user == null) {
			ps.println("{'err' : {'message' : '유저의 세션이 확인되지 않습니다.'}}");
			return;
		}
		
		Planet createdPlanet = planetDao.createPlanet("/url", user.getUserName(), title, content);
		
		if(createdPlanet == null) {
			ps.println("{'err' : {'message' : '행성 생성 중 오류가 발생했습니다.'}}");
			return;
		}

		JSONObject json = new JSONObject();
		json.put("result", this.planetToJSON(createdPlanet));
		ps.println(json);
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();
		
		String planetId = request.getParameter("planetId");
	    		
		if(planetId == null) {
			ps.println("{'err' : {'message' : 'planetId가 감지되지 않습니다.'}}");
			return;
		}

		int planetIdNumber = 0;
				
		try {
			planetIdNumber = Integer.parseInt(planetId);
		} catch (Exception e) {
			ps.println("{'err' : {'message' : 'planetId가 숫자가 아닙니다.'}}");
			return;
		}
		
		Planet planet = planetDao.getPlanet(planetIdNumber);
		
		if(planet == null) {
			ps.println("{'err' : {'message' : '존재하지 않는 행성입니다.'}}");
			return;
		}
		
		JSONObject json = new JSONObject();
		json.put("result", this.planetToJSON(planet));
		ps.println(json);
	}
	
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doPut(req, resp);
		PrintWriter ps = resp.getWriter();

		int result = this.saveCanvas(req);
		
		if(result == 0) {
			ps.println("{'err' : {'message' : '저장을 실패했습니다.'}}");
			return;
		}
		

		ps.println("{'result' : {'message' : '저장을 성공했습니다.'}}");
		return;
	}
	
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doDelete(req, resp);
	}
	
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
	
	private boolean saveFile(String saveFolder, String type, File file, String fileName) {
		String[] fileNameSplited = file.getName().split(".");
		String extension = fileNameSplited[fileNameSplited.length-1];
		
		File realFile = new File(saveFolder + "/" + fileName + "." + extension);
		
		return file.renameTo(realFile);
	}
	
	private JSONObject planetToJSON(Planet planet) {
		JSONObject planetJson = new JSONObject();
		planetJson.put("planetId", planet.getPlanetId());
		planetJson.put("planetTitle", planet.getPlanetTitle());
		planetJson.put("planetContent", planet.getPlanetContent());
		planetJson.put("playerId", planet.getPlayerId());
		

		Canvas canvas = planet.getCanvas();
		planetJson.put("canvas", this.canvasToJSON(canvas));
		
		return planetJson;
	}
	
	private JSONObject canvasToJSON(Canvas canvas) {
		JSONObject canvasJson = new JSONObject();

		canvasJson.put("canvasId", canvas.getCanvasId());
		canvasJson.put("canvasMapAddr", canvas.getCanvasMapAddr());
		canvasJson.put("canvasBumpMapAddr", canvas.getCanvasBumpMapAddr());
		canvasJson.put("canvasContinentMapAddr", canvas.getCanvasContinentMapAddr());
		canvasJson.put("canvasCloudMapAddr", canvas.getCanvasCloudMapAddr());
		
		return canvasJson;
	}
}
