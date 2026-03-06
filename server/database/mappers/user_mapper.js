// database/mappers/user_mapper.js
// 실제 SQL문 실행
const { pool } = require("../DAO");
const userSql = require("../sql/users.js");

// 전체조회
const selectAllUser = async () => {
  let conn = null;
  try {
    // connectionPoll 에서 대기중인 connection 반환
    conn = await pool.getConnection();
    // 해당 connection을 통해 SQL문 실행 및 결과 반환
    let [result] = await conn.query(userSql.selectAllUser);
    return result;
  } catch (err) {
    console.log("전체조회 에러", err);
  } finally {
    // 사용이 끝난 connection를 pool에 돌려줌
    if (conn) conn.release();
  }
};
// 단건조회
const selectUserByNo = async (no) => {
  let conn = null;
  try {
    // connectionPoll 에서 대기중인 connection 반환
    conn = await pool.getConnection();
    // 해당 connection을 통해 SQL문 실행 및 결과 반환
    let [result] = await conn.query(userSql.selectUserByNo, no);
    let info = result[0];
    return info;
  } catch (err) {
    console.log("단건조회 에러", err);
  } finally {
    // 사용이 끝난 connection를 pool에 돌려줌
    if (conn) conn.release();
  }
};
// 등록
const insertUser = async (userInfo) => {
  // userInfo : [] 배열로 와야함 순서대로
  let conn = null;
  try {
    conn = await pool.getConnection();
    let [result] = await conn.query(userSql.insertUser, userInfo);
    return result;
  } catch (err) {
    console.log("등록 에러", err);
  } finally {
    if (conn) conn.release();
  }
};
// 수정
const updateUser = async (userNo, updateData) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // Auto Commit 해제
    let [result] = await conn.query(userSql.updateUser, [updateData, userNo]);
    // 추가 DML 실행 => 같은 트랜잭션으로 묶임
    conn.commit();
    return result;
  } catch (err) {
    console.log("수정 오류", err);
    conn.rollback();
  } finally {
    if (conn) conn.release();
  }
};
// 삭제
const deleteUser = () => {};

module.exports = {
  selectAllUser,
  selectUserByNo,
  insertUser,
  updateUser,
};
