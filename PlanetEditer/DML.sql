
-- 생성
INSERT INTO players(player_id, player_pw, player_name)
VALUES('admin', '해쉬화해야함', '주승규');

INSERT INTO planets(planet_id, player_id, planet_title, planet_content, canvas_id)
VALUES(PLANTES_SEQ.NEXTVAL, 'admin', '지구', '가장 아름다운 행성 - 지구는 내가 먼저 만듦 ㅅㄱ', 1);

INSERT INTO canvas(canvas_id, canvas_map_addr, canvas_bump_map_addr, canvas_color_map_addr, canvas_continent_map_addr, canvas_cloud_map_addr)
VALUES(CANVAS_SEQ.NEXTVAL, '/asdf.png', '/asdf.png', '/asdf.png', '/asdf.png', '/asdf.png');

-- 수정
UPDATE planets SET planet_title=?, planet_content=? WHERE planets_id=?;
UPDATE planets SET canvas_id WHERE planets_id=?;

UPDATE canvas 
SET canvas_map_addr, canvas_bump_map_addr, canvas_color_map_addr, canvas_continent_map_addr, canvas_cloud_map_addr 
WHERE canvas_id=?;

-- 삭제
DELETE FROM planets WHERE planet_id=?;
DELETE FROM canvas WHERE canvas_id=?;

-- 조회
SELECT * FROM planets;
SELECT * FROM players WHERE player_id=?; 
SELECT * FROM canvas WHERE canvas_id=?;

SELECT * FROM canvas WHERE canvas_id=(SELECT MAX(canvas_id) FROM canvas);


