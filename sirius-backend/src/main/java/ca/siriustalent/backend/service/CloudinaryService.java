package ca.siriustalent.backend.service;

import com.cloudinary.Cloudinary;
import ca.siriustalent.backend.exception.ResourceNotFoundException;
import ca.siriustalent.backend.model.dao.LocalUserRepository;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.entities.PerformerProfile;
import ca.siriustalent.backend.utils.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryService {

    private String FOLDER_PICTURE_MAIN = "/picture/main";

    private Cloudinary cloudinary;
    private LocalUserRepository localUserRepository;
    private JwtUtil jwtUtil;

    public CloudinaryService(Cloudinary cloudinary, LocalUserRepository localUserRepository, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.localUserRepository = localUserRepository;
        this.cloudinary = cloudinary;
    }

    public String uploadPerformerImage(String token, MultipartFile file, String suffix) throws IOException {
        LocalUser user = localUserRepository
                .findById(jwtUtil.extractSubject(token))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String folder = "performers/" + user.getId();

        String publicId = folder + "/" + suffix;

        try {
            cloudinary.uploader().destroy(publicId, Map.of("resource_type", "image"));
        } catch (Exception ignored) {}

        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                Map.of(
                        "folder", folder,
                        "public_id", suffix,
                        "resource_type", "image",
                        "transformation", "w_546,h_546,c_fill,g_center",
                        "overwrite", true
                )
        );

        return (String) uploadResult.get("secure_url");
    }
}
