package com.b107.treeway.api.recommend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "region")
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id", nullable = false)
    private Long id;

    @Column(name = "si_code")
    private int siCode;

    @Column(name = "si_full_name")
    private String siFullName;

    @Column(name = "sigu_code")
    private int siGuCode;

    @Column(name = "gu_name")
    private String guName;

    @Column(name = "si_name")
    private String siName;

}