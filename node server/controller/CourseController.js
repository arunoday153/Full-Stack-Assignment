const sql = require('../config/db');

exports.getData = (req,res) => {
    try{
    let query = "select Course.course_id,EducationLevel.level_name ,Course.course_name,Course.annual_tuition,University.university_name,Country.country_name,Scholarship.scholarship_name,EducationLevel.level_name from Course  INNER JOIN University on Course.university_id=University.university_id INNER JOIN Country ON University.country_id = Country.country_id inner join Scholarship on University.university_id=Scholarship.university_id INNER JOIN EducationLevel on EducationLevel.level_id = Course.level_id where 1=1";
    let data = [];
    if(req.query.level){
        query += ` and EducationLevel.level_name like ?`;
        data.push(`%${req.query.level}%`);
    }
    if(req.query.country){
        query += ` and Country.country_name like ?`;
        data.push(`%${req.query.country}%`);
    }
    if(req.query.university){
        query += ` and University.university_name like ? `;
        data.push(`%${req.query.university}%`);
    }
    sql.query(query,data,(error,data) => {
        if(error){
            console.log(`error fetching the data ${error}`);
            res.status(400).json({
                status : 'fail',
                error : error.message
            });
        }
        else {
            res.status(200).json({
                status : 'success',
                data
            });
        }
    }); 
    }
    catch(error){
        res.status(400).json({
            status : 'fail',
            error : error.message
        });
    }  
}