console.log("Signup frontend javascript file");


$(function () {
    const fileTarget = $(".file-box .upload-hidden");
  
    fileTarget.on("change", function () {
        if (window.FileReader) {
            const uploadFile = $(this)[0].files[0];
            const fileType = uploadFile?.type;
            const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
  
            if (!validImageTypes.includes(fileType)) {
                alert("Only .jpg, .jpeg, and .png formats are allowed!");
                $(this).val(""); // clear input
        
                return;
            }
  
            const fileURL = URL.createObjectURL(uploadFile);
            $(".upload-img-frame")
            .attr("src", fileURL)
            .addClass("Success");
  
            const filename = uploadFile.name;
            $(this).siblings(".upload-name").val(filename);
        }
    });
});


function validateSignupForm() {
    console.log("EXECUTED validateSignupForm()");
    const memberName = $(".member-nick").val(),
        memberPhone = $(".member-phone").val(),
        memberPassword = $(".member-password").val(),
        confirmPassword = $(".confirm-password").val();

    if (
        memberName === "" ||
        memberPhone === "" || 
        memberPassword === "" || 
        confirmPassword === "" 
    ) {
        alert("Please insert all required inputs");
        return false;
    }

    if ( memberPassword !== confirmPassword ) {
        alert("Password differs, please check !");
        return false;
    }

    const memberImage = $(".member-image").get(0).files[0] 
        ? $(".member-image").get(0).files[0].name 
        : null;

    if ( !memberImage ) {
        alert("Please insert store image !");
        return false;
    }
}