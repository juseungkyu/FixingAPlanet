package common;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Enumeration;
import java.util.Random;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;

import com.oreilly.servlet.MultipartRequest;

import vo.Canvas;
import vo.Planet;

public class Util {

	// 행성을 json으로
	public static JSONObject planetToJSON(Planet planet) {
		JSONObject planetJson = new JSONObject();
		planetJson.put("planetId", planet.getPlanetId());
		planetJson.put("planetTitle", planet.getPlanetTitle());
		planetJson.put("planetContent", planet.getPlanetContent());
		planetJson.put("playerId", planet.getPlayerId());
		planetJson.put("planetSeaLevel", planet.getSeaLevel());

		Canvas canvas = planet.getCanvas();
		planetJson.put("canvas", canvasToJSON(canvas));

		return planetJson;
	}

	// 캔버스를 json으로
	public static JSONObject canvasToJSON(Canvas canvas) {
		JSONObject canvasJson = new JSONObject();

		canvasJson.put("canvasId", canvas.getCanvasId());
		canvasJson.put("canvasMapAddr", canvas.getCanvasMapAddr());
		canvasJson.put("canvasBumpMapAddr", canvas.getCanvasBumpMapAddr());
		canvasJson.put("canvasContinentMapAddr", canvas.getCanvasContinentMapAddr());
		canvasJson.put("canvasCloudMapAddr", canvas.getCanvasCloudMapAddr());
		canvasJson.put("canvasColorMapAddr", canvas.getCanvasColorMapAddr());

		return canvasJson;
	}

	// 성공 메시지
	public static JSONObject createErrorMessage(String msg) {
		JSONObject err = new JSONObject();
		JSONObject message = new JSONObject();

		message.put("message", msg);
		err.put("err", message);

		return err;
	}

	// 오류 메시지
	public static JSONObject createSuccessMessage(String msg) {
		JSONObject success = new JSONObject();
		JSONObject message = new JSONObject();

		message.put("message", msg);
		success.put("result", message);

		return success;
	}

	// 파일 저장
	public static boolean saveFile(String saveFolder, String type, File file, String fileName) {
		if (file == null) {
			return false;
		}

		try {
			String originName = file.getName();
			System.out.println(originName);
			String[] fileNameSplited = originName.split("\\.");
			String extension = fileNameSplited[fileNameSplited.length - 1];
			File realFile = new File(saveFolder + "/" + fileName + "." + extension);

			System.out.println(realFile.getPath());
			System.out.println(file.getPath());
			
			return file.renameTo(realFile);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
