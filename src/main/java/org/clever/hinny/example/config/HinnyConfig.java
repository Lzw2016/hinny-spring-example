package org.clever.hinny.example.config;

import lombok.extern.slf4j.Slf4j;
import org.clever.hinny.api.folder.ClassPathFolder;
import org.clever.hinny.api.folder.Folder;
import org.clever.hinny.spring.config.ScriptConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 作者：lizw <br/>
 * 创建时间：2020/09/28 22:07 <br/>
 */
@Configuration
@Slf4j
public class HinnyConfig {
    @Bean
    public Folder folder(ScriptConfig scriptConfig) {
        return ClassPathFolder.createRootPath("classpath:**/*.*", scriptConfig.getScriptPath());
    }
}
