
-- 생성
INSERT INTO players(player_id, player_pw, player_name)
VALUES('admin', '해쉬화해야함', '주승규');

INSERT INTO planets(planets_id, player_id, planet_title, planet_content, planet_map_addr, 
planet_bump_map_addr, planet_color_map_addr, planet_continent_map_addr, planet_cloud_map_addr)
VALUES(PLANTES_SEQ.NEXTVAL, 'admin', '지구', '가장 아름다운 별 - 지구는 내가 먼저 만듦 ㅅㄱ', '1','1', '1', '1', PLANTES_SEQ.NEXTVAL);


-- 수정
UPDATE planets SET planet_title=? WHERE planets_id=?;
UPDATE planets SET planet_content=? WHERE planets_id=?;

UPDATE planets SET planet_map_addr=?, planet_bump_map_addr=?,
planet_color_map_addr=?, planet_continent_map_addr=?, planet_cloud_map_addr=? WHERE planets_id=?;

-- 삭제
DELETE FROM planets WHERE planet_id=?;

-- 조회
SELECT * FROM planets;
SELECT * FROM players WHERE player_id=?; 
