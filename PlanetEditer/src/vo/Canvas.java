package vo;

public class Canvas {
	private int canvasId;
	private String canvasMapAddr;
	private String canvasBumpMapAddr;
	private String canvasColorMapAddr;
	private String canvasContinentMapAddr;
	private String canvasCloudMapAddr;
	
	public Canvas(int canvasId, String canvasMapAddr, String canvasBumpMapAddr, String canvasColorMapAddr,
			String canvasContinentMapAddr, String canvasCloudMapAddr) {
		super();
		this.canvasId = canvasId;
		this.canvasMapAddr = canvasMapAddr;
		this.canvasBumpMapAddr = canvasBumpMapAddr;
		this.canvasColorMapAddr = canvasColorMapAddr;
		this.canvasContinentMapAddr = canvasContinentMapAddr;
		this.canvasCloudMapAddr = canvasCloudMapAddr;
	}

	public int getCanvasId() {
		return canvasId;
	}

	public void setCanvasId(int canvasId) {
		this.canvasId = canvasId;
	}

	public String getCanvasMapAddr() {
		return canvasMapAddr;
	}

	public void setCanvasMapAddr(String canvasMapAddr) {
		this.canvasMapAddr = canvasMapAddr;
	}

	public String getCanvasBumpMapAddr() {
		return canvasBumpMapAddr;
	}

	public void setCanvasBumpMapAddr(String canvasBumpMapAddr) {
		this.canvasBumpMapAddr = canvasBumpMapAddr;
	}

	public String getCanvasColorMapAddr() {
		return canvasColorMapAddr;
	}

	public void setCanvasColorMapAddr(String canvasColorMapAddr) {
		this.canvasColorMapAddr = canvasColorMapAddr;
	}

	public String getCanvasContinentMapAddr() {
		return canvasContinentMapAddr;
	}

	public void setCanvasContinentMapAddr(String canvasContinentMapAddr) {
		this.canvasContinentMapAddr = canvasContinentMapAddr;
	}

	public String getCanvasCloudMapAddr() {
		return canvasCloudMapAddr;
	}

	public void setCanvasCloudMapAddr(String canvasCloudMapAddr) {
		this.canvasCloudMapAddr = canvasCloudMapAddr;
	}
}
